namespace shield.api.Controllers
{
  using System.Collections.Generic;
  using System.Linq;

  public class AgentResource
  {
    public AgentResource(IEnumerable<Agent> agents)
    {
      this.Agents = agents;
    }
    
    public string Origin => "s.h.i.e.l.d";

    public string Classification => "top secret";

    public int Count => this.Agents.Count();

    public IEnumerable<Agent> Agents { get; }
  }
}
