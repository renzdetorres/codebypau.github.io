using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReqresIntegratedApplication.Integration.Entities
{
    public class Resource
    {
        public int Page { get; set; }
        public int Per_Page { get; set; }
        public int Total { get; set; }
        public int Total_Pages { get; set; }
        public List<ResourceData> Data { get; set; }
        public Resource(int page, int per_page, int total, int total_pages, List<ResourceData> data) 
        {
            Page = page;
            Per_Page = per_page;
            Total = total;
            Total_Pages = total_pages;
            Data = data;
        }
    }
}