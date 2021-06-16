using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haberler.ViewModel
{
    public class YorumModel
    {
        public int yorumId { get; set; }
        public string yorumIcerik { get; set; }
        public int yorumLike { get; set; }
        public int yorumKullaniciId { get; set; }
        public string yorumKullaniciAdi { get; set; }
        public Nullable<int> yorumHaberId { get; set; }
        public Nullable<int> yorumMakaleId { get; set; }
        public string yorumOlusTarih { get; set; }
        public string yorumDuzTarih { get; set; }
    }
}