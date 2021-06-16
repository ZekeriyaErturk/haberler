using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haberler.ViewModel
{
    public class HaberModel
    {
        public int haberId { get; set; }
        public string haberBasligi { get; set; }
        public string haberIcerik { get; set; }
        public string haberOlusTarih { get; set; }
        public string haberDuzTarih { get; set; }
        public string haberImgUrl { get; set; }
    }
}