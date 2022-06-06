using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using PaulsAutoParts.AppClasses;
using PaulsAutoParts.Common;
using PaulsAutoParts.DataLayer;
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
    public class CustomerMaintApiController : AppController
    {
        private readonly IRepository<Customer, CustomerSearch> _repo;

        public CustomerMaintApiController(AppSession session,
            IRepository<Customer, CustomerSearch> repo) : base(session)
        {
            _repo = repo;
        }

        [HttpDelete("{id}", Name = "Delete")]
        public IActionResult Delete(int id)
        {
            CustomerViewModel vm = new(_repo);
            base.SetViewModelFromSession(vm, UserSession);
            vm.Delete(id);
            return StatusCode(StatusCodes.Status200OK, true);
        }
    }
}
