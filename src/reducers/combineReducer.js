import { UsersReducer as Users } from "./ComponentReducer/users";
import { BlogReducer as Blogs } from "./ComponentReducer/blogs";
import { ComplaintReducer as Complaints } from "./ComponentReducer/complaints";
import { PackageReducer as Packages } from "./ComponentReducer/packages";
import { EventReducer as Events } from "./ComponentReducer/events";
import { EmployeeReducer as Employee } from "./ComponentReducer/employees";
import { ScheduleReducer as Schedules } from "./ComponentReducer/schedules";
import { SubscriptionReducer as Subscriptions } from "./ComponentReducer/subscriptions";
import { CollectionRequestReducer as CollectionRequests } from "./ComponentReducer/collection_request";

export const reducers = {
  Users,
  Blogs,
  Complaints,
  Packages,
  Events,
  Employee,
  Schedules,
  Subscriptions,
  CollectionRequests,
};
