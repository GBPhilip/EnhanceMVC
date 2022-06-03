using Microsoft.AspNetCore.Mvc;

using PaulsAutoParts.AppClasses;
using PaulsAutoParts.Common;
using PaulsAutoParts.EntityLayer;
using PaulsAutoParts.ViewModelLayer;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaulsAutoParts.ControllersApi
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PromoCodeApiController:AppController
    {
        private readonly IRepository<PromoCode, PromoCodeSearch> _repo;

        public PromoCodeApiController(AppSession session, IRepository<PromoCode, PromoCodeSearch> repo)
            :base(session)
        {
            _repo = repo;
        }

        [HttpGet("{code}", Name="DoesCodeExist")]
        public JsonResult DoesCodeExist(string code)
        {
            PromoCodeViewModel vm = new (_repo);
            if (string.IsNullOrEmpty(code))
            {
                return new JsonResult(false);
            }
            return new JsonResult(!vm.DoesCodeExist(code));
        }

    }
}
