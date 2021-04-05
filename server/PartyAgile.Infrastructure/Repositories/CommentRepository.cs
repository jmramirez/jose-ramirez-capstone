using Microsoft.EntityFrameworkCore;
using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly PartyAgileDbContext _context;

        public IUnitOfWork UnitOfWork => _context;

        public CommentRepository(PartyAgileDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Comment> GetAsync(Guid id)
        {
            var comment = await _context.Comments
                .AsNoTracking()
                .Where(x => x.Id == id).FirstOrDefaultAsync();

            if (comment == null) return null;

            _context.Entry(comment).State = EntityState.Detached;
            return comment;
        }

        public async Task<IEnumerable<Comment>> GetCommentByTaskIdAsync(Guid taskId)
        {
            var comments = await _context.Comments
                .Where(comment => comment.TaskId == taskId)
                .ToListAsync();

            return comments;
        }


        public Comment Add(Comment comment)
        {
            return _context.Comments
                .Add(comment).Entity;
        }
    }
}
