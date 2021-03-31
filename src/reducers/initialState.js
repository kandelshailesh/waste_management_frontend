import { UsersState as Users } from './ComponentState/users';
import { BlogState as Blogs } from './ComponentState/blogs';
import { ComplaintState as Complaints } from './ComponentState/complaints';
import { PackageState as Packages } from './ComponentState/packages';
import { EventState as Events } from './ComponentState/events';
import { EmployeeState as Employee } from './ComponentState/employees';
import { ScheduleState as Schedules } from './ComponentState/schedules';

export const initialState = {
  Users,
  Blogs,
  Complaints,
  Packages,
  Events,
  Employee,
  Schedules,
};
