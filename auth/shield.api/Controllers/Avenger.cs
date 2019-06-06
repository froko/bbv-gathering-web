namespace shield.api.Controllers
{
  public class Avenger
  {
    public Avenger(
      int id,
      string alias,
      string name,
      string profile,
      int level)
    {
      this.Id = id;
      this.Alias = alias;
      this.Name = name;
      this.Profile = profile;
      this.Level = level;
    }

    public int Id { get; }

    public string Alias { get; }

    public string Name { get; }

    public string Profile { get; }

    public int Level { get; }
  }
}
