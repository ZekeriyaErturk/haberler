using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haberler.ViewModel
{
    public class KullaniciModel
    {
        public int kullaniciId { get; set; }
        public string kullaniciAdi { get; set; }
        public string kullaniciMail { get; set; }
        public string kullaniciSifre { get; set; }
        public string kullaniciRol { get; set; }
        public string kullaniciOlusTarih { get; set; }
    }
}