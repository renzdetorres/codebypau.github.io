using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReqresIntegratedApplication.Integration.Entities
{
    public class ResourceData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Year { get; set; }
        public string Color { get; set; }
        public string PantoneValue { get; set; }
        public ResourceData(int id, string name, int year, string color, string pantone_value)
        {
            Id = id;
            Name = name;
            Year = year;
            Color = color;
            PantoneValue = pantone_value;
        }
    }
}
