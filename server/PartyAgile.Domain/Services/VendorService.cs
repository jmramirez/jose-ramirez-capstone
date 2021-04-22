using PartyAgile.Domain.Entities;
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
        Task<VendorResponse> GetVendorAsync(GetVendorRequest request);
        Task<VendorResponse> AddVendorAsync(AddVendorRequest request);
        Task<VendorResponse> EditVendorAsync(EditVendorRequest request);
    }
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IVendorEventRepository _vendorEventRepository;
        private readonly IVendorMapper _vendorMapper;

        public VendorService(IVendorMapper vendorMapper, IVendorRepository vendorRepository, IEventRepository eventRepository, IVendorEventRepository vendorEventRepository)
        {
            _vendorRepository = vendorRepository;
            _vendorMapper = vendorMapper;
            _vendorEventRepository = vendorEventRepository;
            _eventRepository = eventRepository;
        }

        public async Task<IEnumerable<VendorResponse>> GetVendorsAsync()
        {
            var result = await _vendorRepository.GetAsync();
            return result.Select(x => _vendorMapper.Map(x));
        }

        public async Task<VendorResponse> GetVendorAsync(GetVendorRequest request)
        {
            if (request?.Id == null) throw new ArgumentNullException();

            var entity = await _vendorRepository.GetAsync(request.Id);
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
            var existingVendor = await _vendorRepository.GetAsync(request.Id);

            if(existingVendor == null) throw new ArgumentException($"Entity with {request.Id} is not present");

            var entity = _vendorMapper.Map(request);
            var result = _vendorRepository.Update(entity);

            await _vendorRepository.UnitOfWork.SaveChangesAsync();
            return _vendorMapper.Map(result);
        }
    }
}
