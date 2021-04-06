using PartyAgile.Domain.Mappers;
using PartyAgile.Domain.Repositories;
using PartyAgile.Domain.Requests.VendorTask;
using PartyAgile.Domain.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Services
{
    public interface IVendorTaskService
    {
        Task<IEnumerable<VendorTaskResponse>> GetVendorTasksAsync();
        Task<VendorTaskResponse> GetVendorTaskAsync(GetVendorTaskRequest request);
        Task<VendorTaskResponse> AddVendorTaskAsync(AddVendorTaskRequest request);
        Task<VendorTaskResponse> EditVendorTaskAsync(EditVendorTaskRequest request);
    }


    public class VendorTaskService : IVendorTaskService
    {
        private readonly IVendorTaskMapper _vendorTaskMapper;
        private readonly IVendorTaskRepository _vendorTaskRepository;

        public VendorTaskService(IVendorTaskMapper vendorTaskMapper, IVendorTaskRepository vendorTaskRepository)
        {
            _vendorTaskMapper = vendorTaskMapper;
            _vendorTaskRepository = vendorTaskRepository;
        }

        public async Task<IEnumerable<VendorTaskResponse>> GetVendorTasksAsync()
        {
            var result = await _vendorTaskRepository.GetAsync();
            return result.Select(x => _vendorTaskMapper.Map(x));
        }

        public async Task<VendorTaskResponse> GetVendorTaskAsync(GetVendorTaskRequest request)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var entity = await _vendorTaskRepository.GetAsync(request.Id);
            return _vendorTaskMapper.Map(entity);
        }

        public async Task<VendorTaskResponse> AddVendorTaskAsync(AddVendorTaskRequest request)
        {
            var taskItem = _vendorTaskMapper.Map(request);
            var result = _vendorTaskRepository.Add(taskItem);
            await _vendorTaskRepository.UnitOfWork.SaveChangesAsync();

            return _vendorTaskMapper.Map(result);
        }

        public async Task<VendorTaskResponse> EditVendorTaskAsync(EditVendorTaskRequest request)
        {
            var existingTask = await _vendorTaskRepository.GetAsync(request.Id);

            if (existingTask == null) throw new ArgumentException($"Entity with {request.Id} is not present");

            var entity = _vendorTaskMapper.Map(request);
            var result = _vendorTaskRepository.Update(entity);

            await _vendorTaskRepository.UnitOfWork.SaveChangesAsync();
            return _vendorTaskMapper.Map(result);
        }
    }
}
