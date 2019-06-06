namespace shield.api.Controllers
{
  using System;
  using System.Collections.Generic;
  using System.IdentityModel.Tokens.Jwt;
  using System.Security.Claims;
  using System.Text;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.IdentityModel.Tokens;

  [Route("oauth/token")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    [HttpPost]
    public IActionResult Login([FromBody] LoginModel user)
    {
      if (user == null)
      {
        return this.BadRequest("Invalid client request");
      }

      if (user.UserName == user.Password)
      {
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@42"));
        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var userBasedTokens = user.UserName.ToLower() == "admin"
          ? new[] {new Claim(ClaimTypes.Name, "CEO"), new Claim(ClaimTypes.Role, "admin")}
          : new[] {new Claim(ClaimTypes.Name, user.UserName)};
        
        var tokeOptions = new JwtSecurityToken(
          issuer: "http://localhost:3000",
          audience: "http://localhost:3000",
          claims: new List<Claim>(userBasedTokens) { new Claim(ClaimTypes.Role, "user") },
          expires: DateTime.Now.AddMinutes(5),
          signingCredentials: signinCredentials
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

        return this.Ok(new { Token = tokenString });
      }

      return this.Unauthorized();
    }
  }
}
