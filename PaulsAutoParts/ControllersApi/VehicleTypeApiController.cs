using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using PaulsAutoParts.AppClasses;
using PaulsAutoParts.Common;
using PaulsAutoParts.EntityLayer;
using PaulsAutoParts.ViewModelLayer;

namespace PaulsAutoParts.ControllersApi
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VehicleTypeApiController:AppController
    {
        private readonly IRepository<VehicleType, VehicleTypeSearch> _repo;

        public VehicleTypeApiController(AppSession session, 
            IRepository<VehicleType, VehicleTypeSearch> repo):base(session)
        {
            _repo = repo;
        }

        [HttpGet("{make}", Name ="SearchMakes")]
        public IActionResult SearchMakes(string make)
        {
            VehicleTypeViewModel vm = new(_repo);
            return StatusCode(StatusCodes.Status200OK, vm.SearchMakes(make));
        }
    }
}
