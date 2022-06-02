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

        [HttpDelete("{id}", Name ="RemoveFromCart")]
        public IActionResult RemoveFromCart(int id)
        {
            ShoppingViewModel viewModel = new(_repo, _vehicleRepo, UserSession.Cart);
            base.SetViewModelFromSession(viewModel, UserSession);
            viewModel.RemoveFromCart(viewModel.Cart, id, UserSession.CustomerId.Value);
            UserSession.Cart = viewModel.Cart;
            return StatusCode(StatusCodes.Status200OK, true);
        }

        [HttpGet("{year}", Name = "GetMakes")]
        public IActionResult GetMakes(int year)
        {
            ShoppingViewModel vm = new(_repo, _vehicleRepo, UserSession.Cart);
            var makes = vm.GetMakes(year);
            return StatusCode(StatusCodes.Status200OK, makes);
        }

        [HttpGet("{year}/{make}", Name = "GetModels")]
        public IActionResult GetModels(int year, string make)
        {
            ShoppingViewModel vm = new(_repo, _vehicleRepo, UserSession.Cart);
            var models = vm.GetModels(year,make);
            return StatusCode(StatusCodes.Status200OK, models);
        }

        [HttpGet("{searchValue}", Name = "SearchCategories")]
        public IActionResult SearchCategories(string searchValue)
        {
            ShoppingViewModel vm = new ShoppingViewModel(_repo, _vehicleRepo, UserSession.Cart);
            if (string.IsNullOrEmpty(searchValue))
            {
                vm.GetCategories();
                return StatusCode(StatusCodes.Status200OK, vm.Categories);
            }
            return StatusCode(StatusCodes.Status200OK, vm.SearchCategories(searchValue));
        }

        [HttpGet(Name = "GetYears")]
        public IActionResult GetYears()
        {
            ShoppingViewModel vm = new(_repo, _vehicleRepo, UserSession.Cart);
            return StatusCode(StatusCodes.Status200OK, vm.GetYears());
        }

        [HttpGet(Name ="GetCategories")]
        public IActionResult GetCategories()
        {
            ShoppingViewModel vm = new(_repo, _vehicleRepo, UserSession.Cart);
            return StatusCode(StatusCodes.Status200OK, vm.GetCategories());
        }

    }

}
