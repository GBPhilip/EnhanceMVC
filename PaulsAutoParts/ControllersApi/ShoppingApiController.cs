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
    public class ShoppingApiController : AppController
    {
        private readonly IRepository<Product, ProductSearch> _repo;
        private readonly IRepository<VehicleType, VehicleTypeSearch> _vehicleRepo;

        public ShoppingApiController(AppSession session,
            IRepository<Product, ProductSearch> repo,
            IRepository<VehicleType, VehicleTypeSearch> vehicleRepo) :base(session)
        {
            _repo = repo;
            _vehicleRepo = vehicleRepo;
        }

 
        [HttpPost(Name = "AddToCart")]
        public IActionResult AddToCart([FromBody] int id)
        {
            ShoppingViewModel viewModel = new(_repo, _vehicleRepo, UserSession.Cart);
            base.SetViewModelFromSession(viewModel, UserSession);

            viewModel.AddToCart(id, UserSession.CustomerId.Value);

            UserSession.Cart = viewModel.Cart;

            return StatusCode(StatusCodes.Status200OK, true);
        }
    }
}
