using ReqresIntegratedApplication.Integration.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace ReqresIntegratedApplication.Integration.Managers
{
    public class ResourceManager : GenericManager<Resource>
    {
        public ResourceManager(HttpClient httpClient, string url, Resource requestBody)
            : base(httpClient, url, requestBody)
        {
            _httpClient.DefaultRequestHeaders.Add("x-api-key", "reqres-free-v1");
        }
    }
}
