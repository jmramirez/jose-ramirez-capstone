using System;

namespace PartyAgile.Domain.Entities
{
    public class Attachment
    {
        public Guid Id { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public string FileName { get; set; }
    }
}