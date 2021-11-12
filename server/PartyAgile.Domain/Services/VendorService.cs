using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Mappers;
using PartyAgile.Domain.Repositories;
using PartyAgile.Domain.Requests.User;
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
        Task<VendorResponse> GetVendorById(GetVendorRequest request, string email);
        Task<IEnumerable<VendorResponse>> GetByEventId(Guid id);
        Task<VendorEventResponse> GetEventVendorAsync(GetVendorEventRequest request);
        Task<IEnumerable<VendorEventResponse>> GetEventsByVendorEmail(GetUserRequest request, string timing);
        Task<VendorResponse> AddVendorAsync(AddVendorRequest request);

        Task<VendorEventSimpleResponse> AssignAsync(AssignVendorRequest request);
        Task<VendorResponse> EditVendorAsync(EditVendorRequest request, string username);
        Task<VendorEventSimpleResponse> EditVendorEventAsync(EditVendorEvent request);
    }
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IVendorEventRepository _vendorEventRepository;
        private readonly IVendorMapper _vendorMapper;
        private readonly IVendorEventMapper _vendorEventMapper;
        private readonly IEventMapper _eventMapper;
        private readonly IUserRepository _userRepository;


        public VendorService(IVendorMapper vendorMapper, IVendorRepository vendorRepository, IEventRepository eventRepository, IVendorEventRepository vendorEventRepository, IVendorEventMapper vendorEventMapper, 
            IEventMapper eventMapper, IUserRepository userRepository)
        {
            _vendorRepository = vendorRepository;
            _vendorMapper = vendorMapper;
            _vendorEventRepository = vendorEventRepository;
            _eventRepository = eventRepository;
            _vendorEventMapper = vendorEventMapper;
            _eventMapper = eventMapper;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<VendorResponse>> GetVendorsAsync()
        {
            var result = await _vendorRepository.GetAsync();
            return result.Select(x => _vendorMapper.Map(x));
        }

        public async Task<VendorResponse> GetVendorById(GetVendorRequest request, string email)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var user = await _userRepository.GetByEmailAsync(email);
            var vendor = await _vendorRepository.GetById(request.Id, user.Id);
            return _vendorMapper.Map(vendor);
        }

        public async Task<IEnumerable<VendorResponse>> GetByEventId(Guid id)
        {
            var vendors = await _vendorRepository.GetByEventId(id);
            var allVendors = await _vendorRepository.GetAsync();
            var result = allVendors.Where(v => vendors.All(x => x.Id != v.Id));
            /*var result = await _vendorRepository.GetByEventId(id);*/
            return result.Select(x => _vendorMapper.Map(x));
        }

        public async Task<VendorEventResponse> GetEventVendorAsync(GetVendorEventRequest request)
        {
            if (request?.VendorId == null) throw new ArgumentNullException();

            var entity = await _vendorEventRepository.GetEventVendor(request.VendorId, request.EventId);
            return _vendorEventMapper.Map(entity);
        }

        public async Task<IEnumerable<VendorEventResponse>> GetEventsByVendorEmail(GetUserRequest request, string timing)
        {
            if (request == null) throw new ArgumentNullException();
            var user = await _userRepository.GetByEmailAsync(request.Email);
            var vendor = await _vendorRepository.GetByUserId(user.Id);
            var result = await _vendorEventRepository.GetVendorEvents(vendor.Id, timing);
            return result.Select(x => _vendorEventMapper.Map(x));
        }


        public async Task<VendorResponse> AddVendorAsync(AddVendorRequest request)
        {
            var vendorItem = _vendorMapper.Map(request);

            var newUser = new Entities.AppUser { UserName = request.ContactEmail, Email = request.ContactEmail };
            bool isCreated = await _userRepository.SignUpAsync(newUser, "partyAgile21", "Vendor");

            if (isCreated)
            {
                vendorItem.UserId = newUser.Id;
            }

            var result = _vendorRepository.Add(vendorItem);

            await _vendorRepository.UnitOfWork.SaveChangesAsync();

            var vendorEvent = new VendorEvent 
            { 
                Vendor = result,
                VendorId = result.Id,
                EventId = request.EventId,
                Budget = new Price { Amount = request.Budget.Amount, Currency = request.Budget.Currency},
                DepositPaid = new Price { Amount = request.DepositPaid.Amount, Currency = request.Budget.Currency}
            };
            _vendorEventRepository.Add(vendorEvent);
            await _vendorEventRepository.UnitOfWork.SaveChangesAsync();

            return _vendorMapper.Map(result);
        }

        public async Task<VendorResponse> EditVendorAsync(EditVendorRequest request, string username)
        {
            var user = await _userRepository.GetByEmailAsync(username);
            var existingVendor = await _vendorRepository.GetById(request.Id, user.Id);

            if(existingVendor == null) throw new ArgumentException($"Entity with {request.Id} is not present");
            request.UserId = user.Id;
            request.ContactEmail = user.UserName;
            var entity = _vendorMapper.Map(request);
            
            var result = _vendorRepository.Update(entity);
            await _vendorRepository.UnitOfWork.SaveChangesAsync();

            await _vendorEventRepository.UnitOfWork.SaveChangesAsync();


            return _vendorMapper.Map(result);
        }

        public async Task<VendorEventSimpleResponse> EditVendorEventAsync(EditVendorEvent request)
        {
            

            var entity = _vendorEventMapper.Map(request);
            var result = _vendorEventRepository.Update(entity);

            await _vendorEventRepository.UnitOfWork.SaveChangesAsync();

            

            return _vendorEventMapper.MapSimple(result);
        }



        public async Task<VendorEventSimpleResponse> AssignAsync(AssignVendorRequest request)
        {
            var vendorItem = _vendorEventMapper.MapRequest(request);
            var result = _vendorEventRepository.Add(vendorItem);
            await _vendorEventRepository.UnitOfWork.SaveChangesAsync();

            return _vendorEventMapper.MapSimple(result);
        }
    }
}
