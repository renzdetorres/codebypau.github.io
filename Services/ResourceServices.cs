using ReqresIntegratedApplication.Integration.Entities;
using ReqresIntegratedApplication.Integration.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReqresIntegratedApplication.Integration.Services
{
    public class ResourceServices
    {
        protected readonly HttpClient httpClient;
        protected readonly string _baseUrl;

        public ResourceServices (HttpClient httpClient, string baseUrl)
        {
            httpClient = httpClient;
            _baseUrl = baseUrl;
        }

        public async Task<Resource> PutResource (Resource resource)
        {
            Resource requestBody = new Resource(resource.Page, resource.Per_Page, resource.Total, resource.Total_Pages, resource.Data);
            ResourceManager resourceManager = new ResourceManager(httpClient, _baseUrl, requestBody);
            return await resourceManager.Put();
        }
    }
}
