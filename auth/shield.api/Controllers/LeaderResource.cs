namespace shield.api.Controllers
{
  using System.Collections.Generic;
  using System.Linq;

  public class LeaderResource
  {
    public LeaderResource(IEnumerable<Leader> leaders)
    {
      this.Leaders = leaders;
    }

    public string Origin => "s.h.i.e.l.d";

    public string Classification => "confidential";

    public int Count => this.Leaders.Count();

    public IEnumerable<Leader> Leaders { get; }
  }
}