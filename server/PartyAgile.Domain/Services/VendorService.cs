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
        Task<VendorResponse> AddVendorAsync(AddVendorRequest request);
        Task<VendorResponse> EditVendorResponse(EditVendorRequest request);
    }
    public class VendorService
    {
        private readonly IVendorRepository _vendorRepository;
        private readonly IVendorMapper _vendorMapper;

        public VendorService(IVendorMapper vendorMapper, IVendorRepository vendorRepository)
        {
            _vendorRepository = vendorRepository;
            _vendorMapper = vendorMapper;
        }

        public async Task<VendorResponse> AddVendorAsync(AddVendorRequest request)
        {
            var vendorItem = _vendorMapper.Map(request);
            var result = _vendorRepository.Add(vendorItem);
            await _vendorRepository.UnitOfWork.SaveChangesAsync();

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
