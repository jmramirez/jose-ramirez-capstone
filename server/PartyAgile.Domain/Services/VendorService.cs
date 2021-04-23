﻿using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Mappers;
using PartyAgile.Domain.Repositories;
using PartyAgile.Domain.Requests.Vendor;
using PartyAgile.Domain.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Services
{
    public interface IVendorService
    {
        Task<IEnumerable<VendorResponse>> GetVendorsAsync();
        Task<VendorResponse> GetVendorAsync(GetVendorEventRequest request);
        Task<VendorResponse> AddVendorAsync(AddVendorRequest request);

        Task<VendorEventResponse> AssignAsync(AssignVendorRequest request);
        Task<VendorResponse> EditVendorAsync(EditVendorRequest request);
        Task<VendorEventResponse> EditVendorEventAsync(EditVendorEvent request);
    }
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IVendorEventRepository _vendorEventRepository;
        private readonly IVendorMapper _vendorMapper;
        private readonly IVendorEventMapper _vendorEventMapper;


        public VendorService(IVendorMapper vendorMapper, IVendorRepository vendorRepository, IEventRepository eventRepository, IVendorEventRepository vendorEventRepository, IVendorEventMapper vendorEventMapper)
        {
            _vendorRepository = vendorRepository;
            _vendorMapper = vendorMapper;
            _vendorEventRepository = vendorEventRepository;
            _eventRepository = eventRepository;
            _vendorEventMapper = vendorEventMapper;
        }

        public async Task<IEnumerable<VendorResponse>> GetVendorsAsync()
        {
            var result = await _vendorRepository.GetAsync();
            return result.Select(x => _vendorMapper.Map(x));
        }

        public async Task<VendorResponse> GetVendorAsync(GetVendorEventRequest request)
        {
            if (request?.VendorId == null) throw new ArgumentNullException();

            var entity = await _vendorRepository.GetAsync( request.EventId, request.VendorId);
            return _vendorMapper.Map(entity);
        }


        public async Task<VendorResponse> AddVendorAsync(AddVendorRequest request)
        {
            var vendorItem = _vendorMapper.Map(request);

            var result = _vendorRepository.Add(vendorItem);

            await _vendorRepository.UnitOfWork.SaveChangesAsync();

            var vendorEvent = new VendorEvent { Vendor = result, EventId = request.EventId};
            _vendorEventRepository.Add(vendorEvent);
            await _vendorEventRepository.UnitOfWork.SaveChangesAsync();


            return _vendorMapper.Map(result);
        }

        public async Task<VendorResponse> EditVendorAsync(EditVendorRequest request)
        {
            //var existingVendor = await _vendorRepository.GetAsync(request.Id);

          //  if(existingVendor == null) throw new ArgumentException($"Entity with {request.Id} is not present");

            var entity = _vendorMapper.Map(request);
            var result = _vendorRepository.Update(entity);

            await _vendorRepository.UnitOfWork.SaveChangesAsync();

            var vendorEvent = new VendorEvent { 
                EventId = request.EventId, 
                VendorId = request.Id ,
                DepositPaid = new Price { Amount = request.DepositPaid.Amount, Currency = request.DepositPaid.Currency },
                Budget = new Price { Amount = request.Budget.Amount, Currency = request.Budget.Currency },
            };

            _vendorEventRepository.Update(vendorEvent);
            await _vendorEventRepository.UnitOfWork.SaveChangesAsync();


            return _vendorMapper.Map(result);
        }

        public async Task<VendorEventResponse> EditVendorEventAsync(EditVendorEvent request)
        {
            

            var entity = _vendorEventMapper.Map(request);
            var result = _vendorEventRepository.Update(entity);

            await _vendorEventRepository.UnitOfWork.SaveChangesAsync();

            

            return _vendorEventMapper.Map(result);
        }



        public async Task<VendorEventResponse> AssignAsync(AssignVendorRequest request)
        {
            var vendorItem = _vendorEventMapper.MapRequest(request);
            var result = _vendorEventRepository.Add(vendorItem);
            await _vendorEventRepository.UnitOfWork.SaveChangesAsync();

            return _vendorEventMapper.Map(result);
        }
    }
}
