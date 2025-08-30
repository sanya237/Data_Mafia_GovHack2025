import { FollowUpQuestion, ProblemIntent } from '../types/app';

export const getFollowUpQuestions = (intent: ProblemIntent): FollowUpQuestion[] => {
  switch (intent) {
    case 'retail':
      return [
        {
          id: 'geography',
          question: 'What suburb or SA2 area are you considering?',
          type: 'text',
          answerKey: 'geography',
          required: true
        },
        {
          id: 'catchment',
          question: 'What catchment area should we analyse?',
          type: 'chips',
          chips: [
            { value: 'walk10', label: '10-min walk' },
            { value: 'drive10', label: '10-min drive' }
          ],
          answerKey: 'catchment',
          required: true
        },
        {
          id: 'focus',
          question: 'Target weekday workers or local residents?',
          type: 'chips',
          chips: [
            { value: 'workers', label: 'Workers' },
            { value: 'residents', label: 'Residents' },
            { value: 'both', label: 'Both' }
          ],
          answerKey: 'focus',
          required: true
        },
        {
          id: 'anchor',
          question: 'Near which anchor point (if any)?',
          type: 'chips',
          chips: [
            { value: 'station', label: 'Train/Tram Station' },
            { value: 'shopping', label: 'Shopping Centre' },
            { value: 'university', label: 'University/Hospital' },
            { value: null, label: 'None' }
          ],
          answerKey: 'anchor'
        }
      ];

    case 'property':
      return [
        {
          id: 'stationName',
          question: 'Which train station are you considering?',
          type: 'text',
          answerKey: 'stationName',
          required: true
        },
        {
          id: 'targetMarket',
          question: 'Target market preference?',
          type: 'chips',
          chips: [
            { value: 'owner', label: 'Owner-occupier' },
            { value: 'renter', label: 'Rental Investment' }
          ],
          answerKey: 'targetMarket',
          required: true
        },
        {
          id: 'horizon',
          question: 'Investment/purchase timeline?',
          type: 'chips',
          chips: [
            { value: '0-2', label: '0-2 years' },
            { value: '2-4', label: '2-4 years' },
            { value: '5+', label: '5+ years' }
          ],
          answerKey: 'horizon',
          required: true
        },
        {
          id: 'contextCheck',
          question: 'Include city-wide market context?',
          type: 'chips',
          chips: [
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' }
          ],
          answerKey: 'contextCheck'
        }
      ];

    case 'school':
      return [
        {
          id: 'addressOrSuburb',
          question: 'Home address or suburb?',
          type: 'text',
          answerKey: 'addressOrSuburb',
          required: true
        },
        {
          id: 'mode',
          question: 'Preferred travel mode and max time?',
          type: 'chips',
          chips: [
            { value: 'walk', label: 'Walking' },
            { value: 'bike', label: 'Cycling' },
            { value: 'pt', label: 'Public Transport' },
            { value: 'car', label: 'Car' }
          ],
          answerKey: 'mode',
          required: true
        },
        {
          id: 'maxMins',
          question: 'Maximum one-way travel time (minutes)?',
          type: 'number',
          answerKey: 'maxMins',
          required: true
        },
        {
          id: 'supports',
          question: 'Special support or language needs?',
          type: 'chips',
          chips: [
            { value: 'eal', label: 'EAL/D Support' },
            { value: 'asd', label: 'ASD Programs' },
            { value: 'extension', label: 'Extension Programs' },
            { value: 'none', label: 'None' }
          ],
          answerKey: 'supports'
        },
        {
          id: 'sector',
          question: 'School sector preference?',
          type: 'chips',
          chips: [
            { value: 'government', label: 'Government' },
            { value: 'catholic', label: 'Catholic' },
            { value: 'independent', label: 'Independent' }
          ],
          answerKey: 'sector'
        }
      ];

    case 'generic':
      return [
        {
          id: 'audience',
          question: 'Who is your target audience?',
          type: 'chips',
          chips: [
            { value: 'students', label: 'Students' },
            { value: 'retirees', label: 'Retirees' },
            { value: 'families', label: 'Families' },
            { value: 'workers', label: 'Workers' }
          ],
          answerKey: 'audience',
          required: true
        },
        {
          id: 'product',
          question: 'What product or service are you offering?',
          type: 'text',
          answerKey: 'product',
          required: true
        },
        {
          id: 'priceRange',
          question: 'Price range category?',
          type: 'chips',
          chips: [
            { value: 'budget', label: 'Budget' },
            { value: 'mid', label: 'Mid-range' },
            { value: 'premium', label: 'Premium' }
          ],
          answerKey: 'priceRange'
        },
        {
          id: 'purpose',
          question: 'Primary analysis purpose?',
          type: 'chips',
          chips: [
            { value: 'growth', label: 'Market Growth' },
            { value: 'competition', label: 'Competition Analysis' },
            { value: 'targeting', label: 'Customer Targeting' }
          ],
          answerKey: 'purpose'
        }
      ];

    default:
      return [];
  }
};