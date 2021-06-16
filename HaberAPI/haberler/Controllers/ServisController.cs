using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using haberler.ViewModel;
using haberler.Models;
using System.Web.Http.Cors;

namespace haberler.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ServisController : ApiController
    {

        haberEntities db = new haberEntities();
        SonucModel sonuc = new SonucModel();

        #region Kullanici
        [Authorize(Roles ="admin")]
        [HttpGet]
        [Route("api/kullaniciliste")]
        public List<KullaniciModel> KullaniciListe()
        {
            List<KullaniciModel> liste = db.kullanici.Select(k => new KullaniciModel()
            {
                kullaniciId = k.kullaniciId,
                kullaniciAdi = k.kullaniciAdi,
                kullaniciSifre = k.kullaniciSifre,
                kullaniciMail = k.kullaniciMail,
                kullaniciRol = k.kullaniciRol,
                kullaniciOlusTarih = k.kullaniciOlusTarih,
            }).ToList();

            return liste;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("api/kullanicibyid/{kullaniciId}")]
        public KullaniciModel KullaniciById(int kullaniciId)
        {
            KullaniciModel kayit = db.kullanici.Where(k => k.kullaniciId == kullaniciId).Select(k => new KullaniciModel()
            {
                kullaniciId = k.kullaniciId,
                kullaniciAdi = k.kullaniciAdi,
                kullaniciMail = k.kullaniciMail,
                kullaniciRol = k.kullaniciRol,
                kullaniciOlusTarih = k.kullaniciOlusTarih,
            }).FirstOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/kullaniciekle")]
        public SonucModel KullaniciEkle(KullaniciModel model)
        {
            if(db.kullanici.Count(k => k.kullaniciAdi == model.kullaniciAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanici Kayıtlıdır.";
                return sonuc;
            }

            kullanici yeni = new kullanici();
            yeni.kullaniciAdi = model.kullaniciAdi;
            yeni.kullaniciMail = model.kullaniciMail;
            yeni.kullaniciSifre = model.kullaniciSifre;
            yeni.kullaniciOlusTarih = model.kullaniciOlusTarih;
            yeni.kullaniciRol = model.kullaniciRol;

            db.kullanici.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kullanici Eklendi";

            return sonuc;
        }

        [HttpPut]
        [Route("api/kullaniciduzenle")]
        public SonucModel KullaniciDuzenle(KullaniciModel model)
        {
            kullanici kayit = db.kullanici.Where(k => k.kullaniciId == model.kullaniciId).FirstOrDefault();
            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanici Kayıtlı Değil.";
                return sonuc;
            }
            if (model.kullaniciAdi != null)
                kayit.kullaniciAdi = model.kullaniciAdi;
            if (model.kullaniciMail != null)
                kayit.kullaniciMail = model.kullaniciMail;
            if (model.kullaniciSifre != null)
                kayit.kullaniciSifre = model.kullaniciSifre;
            if (model.kullaniciRol != null)
                kayit.kullaniciRol = model.kullaniciRol;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kullanici Düzenlendi";

            return sonuc;
        }

        [Authorize(Roles = "admin")]
        [HttpDelete]
        [Route("api/kullanicisil/{kullaniciid}")]
        public SonucModel KullaniciSil(int kullaniciId)
        {
            kullanici kayit = db.kullanici.Where(k => k.kullaniciId == kullaniciId).FirstOrDefault();
            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanici Kayıtlı Değil.";
                return sonuc;
            }

            db.kullanici.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kullanici Silindi";

            return sonuc;
        }

        #endregion

        #region Haber
        [HttpGet]
        [Route("api/haberListe")]
        public List<HaberModel> HaberListe()
        {
            List<HaberModel> liste = db.haber.Select(h => new HaberModel()
            {
                haberId = h.haberId,
                haberBasligi = h.haberBasligi,
                haberIcerik = h.haberIcerik,
                haberImgUrl = h.haberImgUrl,
                haberOlusTarih = h.haberOlusTarih,
                haberDuzTarih = h.haberOlusTarih
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/haberlistebyid/{haberId}")]
        public HaberModel HaberlisteById(int haberId)
        {
            HaberModel kayıt = db.haber.Where(h => h.haberId == haberId).Select(h => new HaberModel()
            {
                haberId = h.haberId,
                haberBasligi = h.haberBasligi,
                haberIcerik = h.haberIcerik,
                haberImgUrl = h.haberImgUrl,
                haberOlusTarih = h.haberOlusTarih,
                haberDuzTarih = h.haberOlusTarih

            }).SingleOrDefault();

            return kayıt;
        }

        [HttpPost]
        [Route("api/haberekle")]
        public SonucModel HaberEkle(HaberModel model)
        {
            if(db.haber.Count(h => h.haberBasligi == model.haberBasligi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Haber zaten mevcut";
                return sonuc;
            }

            haber yeni = new haber();
            yeni.haberBasligi = model.haberBasligi;
            yeni.haberIcerik = model.haberIcerik;
            yeni.haberImgUrl = model.haberImgUrl;
            yeni.haberOlusTarih = model.haberOlusTarih;
            yeni.haberDuzTarih = model.haberOlusTarih;

            db.haber.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Haber Eklendi";

            return sonuc;
        }

        [HttpPut]
        [Route("api/haberduzenle")]
        public SonucModel HaberDuzenle(HaberModel model)
        {
            haber kayit = db.haber.Where(h => h.haberId == model.haberId).SingleOrDefault();
            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Haber Kayıtlı Değil";
                return sonuc;
            }

            kayit.haberBasligi = model.haberBasligi;
            kayit.haberIcerik = model.haberIcerik;
            kayit.haberImgUrl = model.haberImgUrl;
            kayit.haberDuzTarih = model.haberDuzTarih;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Haber Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/habersil/{haberId}")]
        public SonucModel HaberSil(int haberId)
        {
            haber kayit = db.haber.Where(h => h.haberId == haberId).SingleOrDefault();
            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Haber Kayıtlı Değil";
                return sonuc;
            }

            db.haber.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Haber Silindi";

            return sonuc;
        }
        #endregion

        #region Makale
        [HttpGet]
        [Route("api/makaleliste")]
        public List<MakaleModel> MakaleListe()
        {
            List<MakaleModel> liste = db.makale.Select(m => new MakaleModel()
            {
                makaleId = m.makaleId,
                makaleBaslik = m.makaleBaslik,
                makaleIcerik = m.makaleİcerik,
                makaleYazarId = m.makaleYazarId,
                makaleYazarAdi = m.kullanici.kullaniciAdi,
                makaleOlusTarih = m.makaleOlusTarih,
                makaleDuzTarih = m.makaleDuzTarih,
                makaleImgUrl = m.makaleImgUrl,
            }).ToList();

            return liste;
        }


        [HttpGet]
        [Route("api/makalebyyazarid/{yazarId}")]
        public List<MakaleModel> MakalebyYazarId(int yazarId)
        {
            List<MakaleModel> liste = db.makale.Where(m => m.makaleYazarId == yazarId).Select(m => new MakaleModel()
            {
                makaleId = m.makaleId,
                makaleBaslik = m.makaleBaslik,
                makaleIcerik = m.makaleİcerik,
                makaleYazarId = m.makaleYazarId,
                makaleYazarAdi = m.kullanici.kullaniciAdi,
                makaleOlusTarih = m.makaleOlusTarih,
                makaleDuzTarih = m.makaleDuzTarih,
                makaleImgUrl = m.makaleImgUrl,
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/makalebyid/{makaleId}")]
        public MakaleModel MakaleById(int makaleId)
        {
            MakaleModel kayit = db.makale.Where(m => m.makaleId == makaleId).Select(m => new MakaleModel()
            {
                makaleId = m.makaleId,
                makaleBaslik = m.makaleBaslik,
                makaleIcerik = m.makaleİcerik,
                makaleYazarId = m.makaleYazarId,
                makaleYazarAdi = m.kullanici.kullaniciAdi,
                makaleOlusTarih = m.makaleOlusTarih,
                makaleDuzTarih = m.makaleDuzTarih,
                makaleImgUrl = m.makaleImgUrl,
            }).FirstOrDefault();

            return kayit;
        }

        [Authorize(Roles = "admin, yazar")]
        [HttpPost]
        [Route("api/makaleekle")]
        public SonucModel MakaleEkle(MakaleModel model)
        {
            if(db.makale.Count(m => m.makaleBaslik == model.makaleBaslik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Makale Zaten Mevcut";
                return sonuc;
            }

            makale yeni = new makale();
            yeni.makaleBaslik = model.makaleBaslik;
            yeni.makaleİcerik = model.makaleIcerik;
            yeni.makaleImgUrl = model.makaleImgUrl;
            yeni.makaleYazarId = model.makaleYazarId;
            yeni.makaleOlusTarih = model.makaleOlusTarih;
            yeni.makaleDuzTarih = model.makaleOlusTarih;
            

            db.makale.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Makale Eklendi";

            return sonuc;
        }

        [Authorize(Roles = "admin, yazar")]
        [HttpPut]
        [Route("api/makaleduzenle")]
        public SonucModel MakaleDuzenle(MakaleModel model)
        {
            makale kayit = db.makale.Where(m => m.makaleId == model.makaleId).FirstOrDefault();
            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Makale Kayıtlı Değil";
                return sonuc;
            }

            kayit.makaleBaslik = model.makaleBaslik;
            kayit.makaleİcerik = model.makaleIcerik;
            kayit.makaleImgUrl = model.makaleImgUrl;
            kayit.makaleDuzTarih = model.makaleDuzTarih;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Makale Düzenlendi";

            return sonuc;
        }

        [Authorize(Roles = "admin, yazar")]
        [HttpDelete]
        [Route("api/makalesil/{makaleId}")]
        public SonucModel MakaleSil(int makaleId)
        {
            makale kayit = db.makale.Where(m => m.makaleId == makaleId).FirstOrDefault();
            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Makale Bulunamadı";
                return sonuc;
            }

            db.makale.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Makele Silindi";

            return sonuc;
        }
        #endregion

        #region Yorum
        [HttpGet]
        [Route("api/yorumliste")]
        public List<YorumModel> YorumListe()
        {
            List<YorumModel> liste = db.yorum.Select(y => new YorumModel()
            {
                yorumId = y.yorumId,
                yorumIcerik = y.yorumIcerik,
                yorumLike = y.yorumLike,
                yorumKullaniciAdi = y.kullanici.kullaniciAdi,
                yorumHaberId = y.yorumHaberId,
                yorumMakaleId = y.yorumMakaleId
            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/yorumbymakale/{makaleId}")]
        public List<YorumModel> YorumByMakale(int makaleId)
        {
            List<YorumModel> liste = db.yorum.Where(y => y.yorumMakaleId == makaleId).Select(y => new YorumModel()
            {
                yorumId = y.yorumId,
                yorumIcerik = y.yorumIcerik,
                yorumLike = y.yorumLike,
                yorumDuzTarih = y.yorumDuzTarih,
                yorumKullaniciAdi = y.kullanici.kullaniciAdi,
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/yorumbyhaber/{haberId}")]
        public List<YorumModel> YorumByHaber(int haberId)
        {
            List<YorumModel> liste = db.yorum.Where(y => y.yorumHaberId == haberId).Select(y => new YorumModel()
            {
                yorumId = y.yorumId,
                yorumIcerik = y.yorumIcerik,
                yorumLike = y.yorumLike,
                yorumDuzTarih = y.yorumDuzTarih,
                yorumKullaniciAdi = y.kullanici.kullaniciAdi,
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/yorumbykullanici/{kullaniciId}")]
        public List<YorumModel> YorumByKullanici(int kullaniciId)
        {
            List<YorumModel> liste = db.yorum.Where(y => y.yorumKullaniciId == kullaniciId).Select(y => new YorumModel()
            {
                yorumId = y.yorumId,
                yorumIcerik = y.yorumIcerik,
                yorumLike = y.yorumLike,
                yorumDuzTarih = y.yorumDuzTarih,
                yorumKullaniciAdi = y.kullanici.kullaniciAdi,
            }).ToList();

            return liste;
        }

        [HttpPost]
        [Route("api/yorumekle")]
        public SonucModel YorumEkle(YorumModel model)
        {
            if(db.yorum.Count(y => y.yorumIcerik == model.yorumIcerik && y.yorumId == model.yorumId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yorum Yapılı";
                return sonuc;
            }

            yorum yeni = new yorum();
            yeni.yorumIcerik = model.yorumIcerik;
            yeni.yorumLike = model.yorumLike;
            yeni.yorumOlusTarih = model.yorumOlusTarih;
            yeni.yorumDuzTarih = model.yorumDuzTarih;
            yeni.yorumKullaniciId = model.yorumKullaniciId;
            yeni.yorumHaberId = model.yorumHaberId;
            yeni.yorumMakaleId = model.yorumMakaleId;

            db.yorum.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Yapıldı";

            return sonuc;
        }

        [HttpPut]
        [Route("api/yorumduzenle")]
        public SonucModel YorumDuzenle(YorumModel model)
        {
            yorum kayit = db.yorum.Where(y => y.yorumId == model.yorumId).FirstOrDefault();

            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yorum Kayıtlı Değil";
                return sonuc;
            }

            kayit.yorumIcerik = model.yorumIcerik;
            kayit.yorumLike = model.yorumLike;
            kayit.yorumDuzTarih = model.yorumDuzTarih;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/yorumsil/{yorumId}")]
        public SonucModel YorumSil(int yorumId)
        {
            yorum kayit = db.yorum.Where(y => y.yorumId == yorumId).FirstOrDefault();
            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yorum Kayıtlı Değil";
                return sonuc;
            }

            db.yorum.Remove(kayit);

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Silindi";
            return sonuc;
        }
        #endregion
    }
}
