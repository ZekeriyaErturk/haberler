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
    using System.Collections.Generic;
    
    public partial class makale
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public makale()
        {
            this.yorum = new HashSet<yorum>();
        }
    
        public int makaleId { get; set; }
        public string makaleBaslik { get; set; }
        public string makaleİcerik { get; set; }
        public int makaleYazarId { get; set; }
        public string makaleOlusTarih { get; set; }
        public string makaleDuzTarih { get; set; }
        public string makaleImgUrl { get; set; }
    
        public virtual kullanici kullanici { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<yorum> yorum { get; set; }
    }
}