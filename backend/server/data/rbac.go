package data

var RolePermissions = map[string][]string{
	"admin": {
		"create_contest",
		"delete_contest",
		"edit_problem",
		"remove_problem",
		"update_problem",
		"create_user",
		"assgin_roles",
		"create_administrator_password",
	},
	"administrator": {
		"resolve",
	},
	"user": {
		"submit_solution",
		"view_problem",
	},
}

func HasPermission(userRoles []string, permission string) bool {
	for _, role := range userRoles {
		perms, exists := RolePermissions[role]
		if !exists {
			continue
		}
		for _, p := range perms {
			if p == permission {
				return true
			}
		}
	}
	return false
}
