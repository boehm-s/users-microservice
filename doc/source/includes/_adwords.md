# Adwords API for estimations

## 1. Create a budget

```javascript
    const operand = {
    name: budgetName,
    amount: {
      microAmount: amount * 1000000,
      'xsi:type': 'Money'
    },
    deliveryMethod: 'STANDARD'
  };
```

Service name : **BudgetService**   <br>
Operation: **mutate**   <br>
  operator: **'ADD'**   <br>
  operand: *budget object*

## 2. Create a campaign

```javascript
const operand = {
    name: campaignName,
    budget: {
      budgetId: budgetId
    },
    advertisingChannelType: 'SEARCH',
    biddingStrategyConfiguration: {
      biddingStrategyType: 'MANUAL_CPC'
    },
  };
```

Service name : **CampaignService**    <br>
Operation: **mutate**    <br>
  operator: **'ADD'**    <br>
  operand: *campaign object*  (containing the budget ID)

## 3. Set campaign criterions (location, language ...)

```javascript
const operand: {
    campaignId: campaignId,
    criterion: {
      id: locationID, // ex: 1006094 = Paris
      'xsi:type': 'Location',
      targetingStatus: 'ACTIVE'
    },
    'xsi:type': 'NegativeCampaignCriterion'
  }
```

Service name : **CampaignCriterionService** <br>
Operation: **mutate** <br>
  operator: **'ADD'** <br>
  operand: *CampaignCriterionOperation object*  (containing the campaign ID)

## 4. Create an adGroup

```javascript
const operand = {
    campaignId: campaignId,
    name: adGroupName,
    status: 'PAUSED',
    biddingStrategyConfiguration: {
        bids: [{
            'xsi:type': 'CpaBid',
            bid: {
                'xsi:type': 'Money',
                microAmount: amount * 1000000
            }
        }]
    }
};
```

Service name : **AdGroupService**    <br>
Operation: **mutate**    <br>
  operator: **'ADD'**    <br>
  operand: *adGroup object*  (containing the campaign ID)

## 5. Add criterion (keyword ...) to adGroup
```javascript
const operand = {
    'xsi:type': 'BiddableAdGroupCriterion',
    adGroupId: adgroupId,
    criterion: {
        'xsi:type': 'Keyword',
        text: word,
        matchType: 'EXACT'
    },
    userStatus: 'PAUSED'
};
```
Service name : **AdGroupCriterionService**    <br>
Operation: **mutate**    <br>
  operator: **'ADD'**    <br>
  operand: *Criterion object*  (containing the adGroup ID)
