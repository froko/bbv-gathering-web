namespace shield.api.Controllers
{
  using System.Collections.Generic;
  using System.Linq;

  public class AvengerResource
  {
    public AvengerResource(IEnumerable<Avenger> avengers)
    {
      this.Avengers = avengers;
    }

    public string Origin => "s.h.i.e.l.d";

    public string Classification => "confidential";

    public int Count => this.Avengers.Count();

    public IEnumerable<Avenger> Avengers { get; }
  }
}