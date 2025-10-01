using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReqresIntegratedApplication.Integration.Entities;
using ReqresIntegratedApplication.Integration.Services;

namespace ReqresIntegratedApplication.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        public ResourceController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPut]
        public async Task<ActionResult> PutResource()
        {
            string baseUrl = "https://reqres.in/api/resources";
            ResourceServices resourceservice = new ResourceServices(_httpClient, baseUrl);
            return Ok(resourceservice);
        }
    }
}
