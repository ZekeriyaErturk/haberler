using haberler.Models;
using haberler.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haberler.Auth
{
    public class KullanıcıServis
    {
        haberEntities db = new haberEntities();

        public KullaniciModel KullaniciOturumAc(string kadi, string parola)
        {
            KullaniciModel kullanıcı = db.kullanici
                .Where(u => u.kullaniciAdi == kadi && u.kullaniciSifre == parola)
                .Select(u => new KullaniciModel()
                {
                    kullaniciId = u.kullaniciId,
                    kullaniciAdi = u.kullaniciAdi,
                    kullaniciMail = u.kullaniciMail,
                    kullaniciRol = u.kullaniciRol,
                    kullaniciOlusTarih = u.kullaniciOlusTarih
                }).SingleOrDefault();

            return kullanıcı;
        }
    }
}