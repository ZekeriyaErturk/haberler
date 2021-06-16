using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haberler.ViewModel
{
    public class MakaleModel
    {
        public int makaleId { get; set; }
        public string makaleBaslik { get; set; }
        public string makaleIcerik { get; set; }
        public int makaleYazarId { get; set; }
        public string makaleYazarAdi { get; set; }
        public string makaleOlusTarih { get; set; }
        public string makaleDuzTarih { get; set; }
        public string makaleImgUrl { get; set; }
    }
}