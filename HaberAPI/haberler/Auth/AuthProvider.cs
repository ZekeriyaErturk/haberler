using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;


namespace haberler.Auth
{
    public class AuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var kullanıcıServis = new KullanıcıServis();
            var uye = kullanıcıServis.KullaniciOturumAc(context.UserName, context.Password);
            string uyeYetkileri;

            if (uye != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role, uye.kullaniciRol));
                identity.AddClaim(new Claim(ClaimTypes.PrimarySid, uye.kullaniciId.ToString()));

                AuthenticationProperties propert = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { "kullaniciId", uye.kullaniciId.ToString() },
                    { "kullaniciAdi", uye.kullaniciAdi },
                    { "kullaniciRol",uye.kullaniciRol }
                });
                AuthenticationTicket ticket = new AuthenticationTicket(identity, propert);
                context.Validated(ticket);
            }
            else
            {
                context.SetError("Geçersiz istek", "Hatalı kullanıcı bilgisi");
            }
        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}