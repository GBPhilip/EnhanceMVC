using System;
using System.Collections.Generic;
using System.Linq;
using PaulsAutoParts.Common;
using PaulsAutoParts.EntityLayer;

namespace PaulsAutoParts.ViewModelLayer
{
  public class OrderHeaderViewModel : AppViewModelBase
  {
    #region Constructors
    /// <summary>
    ///  NOTE: You need to have a parameterless constructor for Post-Backs in MVC    
    /// </summary>
    public OrderHeaderViewModel() : base()
    {
      Init();
    }

    public OrderHeaderViewModel(IRepository<OrderHeader, OrderHeaderSearch> repository) : base()
    {
      Init();

      Repository = repository;
    }
    #endregion

    #region Properties
    public IRepository<OrderHeader, OrderHeaderSearch> Repository { get; set; }
    public List<OrderHeader> DataCollection { get; set; }
    public OrderHeader SelectedEntity { get; set; }
    public OrderHeaderSearch SearchEntity { get; set; }
    #endregion

    #region Init Method
    public override void Init()
    {
      base.Init();

      DataCollection = new List<OrderHeader>();
      SelectedEntity = new OrderHeader();
      SearchEntity = new OrderHeaderSearch();
    }
    #endregion

    #region Get Method
    public override void Get()
    {
      IsDetailVisible = false;

      if (Repository == null) {
        throw new ApplicationException("Must set the Repository property.");
      }
      else {
        DataCollection = Repository.Get();
      }

      if (DataCollection != null) {
        TotalRecords = DataCollection.Count;
      }
    }
    #endregion

    #region Get(id) Method
    public override void Get(int id)
    {
      IsDetailVisible = true;

      if (Repository == null) {
        throw new ApplicationException("Must set the Repository property.");
      }
      else {
        SelectedEntity = Repository.Get(id);
      }

      if (SelectedEntity != null) {
        TotalRecords = 1;
      }
    }
    #endregion

    #region Search Method
    public override void Search()
    {
      IsDetailVisible = false;

      if (Repository == null) {
        throw new ApplicationException("Must set the Repository property.");
      }
      else {
        DataCollection = Repository.Search(SearchEntity).OrderBy(p => p.OrderHeaderId).ToList();
      }

      if (DataCollection != null) {
        TotalRecords = DataCollection.Count;
      }
    }
    #endregion

    #region CreateEmptyEntity Method
    public override void CreateEmptyEntity()
    {
      SelectedEntity = Repository.CreateEmpty();
    }
    #endregion

    #region Save Method
    public override bool Save()
    {
      bool ret = false;

      if (Validate()) {
        if (SelectedEntity.OrderHeaderId.HasValue) {
          // Update the current entity
          Repository.Update(SelectedEntity);
        }
        else {
          // Add a new entity
          Repository.Insert(SelectedEntity);
        }
        ret = true;
      }

      return ret;
    }
    #endregion

    #region Validate Method
    public override bool Validate()
    {
      IsValid = false;
      Messages = new List<string>();

      // TODO: Validate Your Properties Here


      IsValid = (Messages.Count == 0);

      return IsValid;
    }
    #endregion

    #region Delete Method
    public override bool Delete(int id)
    {
      // Delete the entity by id
      Repository.Delete(id);

      return true;
    }
    #endregion
  }
}
