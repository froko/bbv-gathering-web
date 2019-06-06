namespace shield.api.Controllers
{
  using System.Linq;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Mvc;

  [Route("api/agents")]
  [ApiController]
  public class AgentsController : ControllerBase
  {
    private static readonly Agent[] Agents =
    {
      new Agent(13, "Phil Coulson", "assets/phil.png", 8),
      new Agent(100, "Melinda May", "assets/melinda.png", 6),
      new Agent(101, "Daisy \"Skye\" Johnson", "assets/daisy.png", 6),
      new Agent(102, "Leo Fitz", "assets/leo.png", 7),
      new Agent(103, "Jemma Simmons", "assets/jemma.png", 7)
    };

    [HttpGet, Authorize]
    public ActionResult<AgentResource> Get()
    {
      return new AgentResource(Agents);
    }

    [HttpGet("{id}"), Authorize]
    public ActionResult<Agent> Get(int id)
    {
      return Agents.SingleOrDefault(a => a.Id == id);
    }
  }
}
