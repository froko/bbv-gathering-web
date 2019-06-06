namespace shield.api.Controllers
{
  using System.Linq;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Mvc;

  [Route("api/avengers")]
  [ApiController]
  public class AvengersController : ControllerBase
  {
    private static readonly Avenger[] Avengers =
    {
      new Avenger(1, "Iron Man", "Tony Stark", "assets/iron-man.png", 7),
      new Avenger(2, "Captain America", "Steve Rogers", "assets/captain-america.png", 5),
      new Avenger(3, "Black Widow", "Natasha Romanoff", "assets/black-widow.png", 5),
      new Avenger(4, "Hulk", "Bruce Banner", "assets/hulk.png", 6),
      new Avenger(5, "Hawkeye", "Clint Barton", "assets/hawkeye.png", 4),
      new Avenger(6, "Thor", "Thor Odinsson", "assets/thor.png", 4)
    };

    [HttpGet, Authorize]
    public ActionResult<AvengerResource> Get()
    {
      return new AvengerResource(Avengers);
    }

    [HttpGet("{id}"), Authorize]
    public ActionResult<Avenger> Get(int id)
    {
      return Avengers.SingleOrDefault(a => a.Id == id);
    }
  }
}