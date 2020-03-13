import { DateFilterEffects } from './date-filter/state/date-filter.effects'
import { PendingListEffects } from './pending-list/state/pending-list.effects'
import { RejectedListEffects } from './rejected-list/state/rejected-list.effects'
import { ApprovedListEffects } from './approved-list/state/apporved-list.effects'

// Effects
export const EFFECTS = [DateFilterEffects, PendingListEffects, RejectedListEffects, ApprovedListEffects]
