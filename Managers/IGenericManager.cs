using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReqresIntegratedApplication.Integration.Managers
{
    public interface IGenericManager<T> where T : class
    {
        Task<T> Get(int id);
        Task<List<T>> GetAll();
        Task<T> Put();
    }
}
