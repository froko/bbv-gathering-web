namespace shield.api.Controllers
{
  using System.Linq;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Mvc;

  [Route("api/leaders")]
  [ApiController]
  public class LeadersController : ControllerBase
  {
    private static readonly Leader[] Leaders =
    {
      new Leader(10, "Peggy Carter", "assets/peggy.png", 10),
      new Leader(11, "Alexander Pierce", "assets/alexander.png", 10),
      new Leader(12, "Nick Fury", "assets/nick.png", 10),
      new Leader(13, "Phil Coulson", "assets/phil.png", 8),
    };

    [HttpGet, Authorize]
    public ActionResult<LeaderResource> Get()
    {
      return new LeaderResource(Leaders);
    }

    [HttpGet("{id}"), Authorize]
    public ActionResult<Leader> Get(int id)
    {
      return Leaders.SingleOrDefault(a => a.Id == id);
    }
  }
}
