using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Repositories
{
    public interface ICommentRepository : IRepository
    {
        Task<IEnumerable<Comment>> GetCommentByTaskIdAsync(Guid taskId);
        Task<Comment> GetAsync(Guid Id);
        Comment Add(Comment commemt);

    }
}
