namespace shield.api.Controllers
{
  public class Agent
  {
    public Agent(
      int id,
      string name,
      string profile,
      int level)
    {
      this.Id = id;
      this.Name = name;
      this.Profile = profile;
      this.Level = level;
    }

    public int Id { get; }

    public string Name { get; }

    public string Profile { get; }

    public int Level { get; }
  }
}
