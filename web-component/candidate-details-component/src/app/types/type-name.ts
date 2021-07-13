
// IHotelContact interface
export interface IHotelContact {
    contactEmail?: string;
    contactName: string;
    contactPhone: string;
    contactTitle: string;
  }
// RateInfo type
  export class RateInfo {
    rateId: number;
    rateName: string;
    name?: string;
    pmscode?: string;
    rateCategory: string;
    sortOrder: number;
    isMultiCurrency?: boolean;
    currencyCode: string;
    defaultRate?: boolean;
    selected?: boolean;
    isCollapsed: boolean;
    isDerivedRate?: boolean;
    isEnterpriseRate?: boolean;
    derivedRateCode?: string;
    rateCatalogId?: number;
    isForceRefresh = false;
    constructor(data: any) {
      this.rateId = (data && data.rateId) ? data.rateId : undefined;
      this.name = (data && data.rateName) ? data.rateName : undefined;
      this.rateName = this.name;
      this.pmscode = (data && data.pmscode) ? data.pmscode : undefined;
      this.rateCategory = (data && data.rateCategory) ? data.rateCategory : undefined;
      this.sortOrder = (data && data.sortOrder) ? data.sortOrder : undefined;
      this.defaultRate = (data && data.defaultRate) ? data.defaultRate : false;
      this.isCollapsed = true;
      this.isMultiCurrency = (data && data.isMultiCurrency) ? data.isMultiCurrency : false;
      this.currencyCode = (data && data.currencyCode) ? data.currencyCode : undefined;
      this.isDerivedRate = (data && data.isDerivedRate) ? data.isDerivedRate : false;
      this.isEnterpriseRate = (data && data.isEnterpriseRate) ? data.isEnterpriseRate : false;
      this.derivedRateCode = (data && data.derivedRateCode) ? data.derivedRateCode : undefined;
      this.rateCatalogId = (data && data.rateCatalogId) ? data.rateCatalogId : undefined;
    }
  }
// HotelInfo type
  export class HotelInfo {
    hotelId: number;
    name: string;
    holdRoom: boolean;
    outOfOrderRooms?: boolean;
    contact: IHotelContact;
    userLocale: string;
    isMulticurrencySupport = false;
    chainCode?: string;
    chainId?: number;
    isDerivedRatePresent?: boolean;
    isUrmUpdatesDisabled: boolean;
    groupIds?: number[];
    rates: RateInfo[] = [];

    constructor(data: HotelInfo) {
      this.hotelId = data.hotelId;
      this.name = data.name;
      this.contact = data.contact;
      this.userLocale = data.userLocale;
      this.chainCode = data.chainCode ? data.chainCode : undefined;
      this.chainId = data.chainId ? data.chainId : undefined;
      this.isUrmUpdatesDisabled = data.isUrmUpdatesDisabled;
      this.groupIds = data.groupIds ? data.groupIds : [];
      if (data && data.rates) {
        const rateListLength = data.rates.length;
        for (let i = 0; i < rateListLength; i++) {
          const currentRate = data.rates[i];
          this.rates.push(new RateInfo(currentRate));
        }
        this.isDerivedRatePresent = this.chainId && this.rates.some((rateInfo) => rateInfo.isDerivedRate);
      }
    }

    getRatesForCurrency(currencyCode?: string): RateInfo[] {
      const currencyCodeToFilter = currencyCode;
      return this.rates.filter((rate) => rate.currencyCode === currencyCodeToFilter);
    }
    /**
     * Return object of default rate plan.
     * @param None
     * @returns {RateInfo} Default rate plan object.
     * @memberof HotelInfo
     */
    getDefaultRatePlan?(): RateInfo {
      const filteredRate: RateInfo[] = this.rates.filter((rate) => {
        return rate.defaultRate;
      });
      return filteredRate ? filteredRate[0] : null;
    }
    /**
     * Return first rate plan for selected
     * currency
     * @param currencyCode: string
     * @returns {RateInfo} rate plan object.
     * @memberof HotelInfo
     */
    getFirstRateOfSelectedCurrency(currencyCode: string) {
      const rateList = this.getRatesForCurrency(currencyCode);
      return rateList[0] ? rateList[0] : undefined;
    }
  }



// Usage Example
  this.dataService.getHotelInfoData().subscribe((hotelData) => {
    const hotelInfo = new HotelInfo(hotelData);
    console.log(hotelInfo);
});


