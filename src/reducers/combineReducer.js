import { UsersReducer as Users } from './ComponentReducer/users';
import { BlogReducer as Blogs } from './ComponentReducer/blogs';
import { ComplaintReducer as Complaints } from './ComponentReducer/complaints';
import { PackageReducer as Packages } from './ComponentReducer/packages';
import { EventReducer as Events } from './ComponentReducer/events';
import { EmployeeReducer as Employee } from './ComponentReducer/employees';

export const reducers = {
  Users,
  Blogs,
  Complaints,
  Packages,
  Events,
  Employee,
};
