//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace haberler.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class haberEntities : DbContext
    {
        public haberEntities()
            : base("name=haberEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<haber> haber { get; set; }
        public virtual DbSet<kullanici> kullanici { get; set; }
        public virtual DbSet<makale> makale { get; set; }
        public virtual DbSet<yorum> yorum { get; set; }
    }
}
