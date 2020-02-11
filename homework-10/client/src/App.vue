<template>
    <div class="page">
        <header class="page__header">
            <button type="button" class="btn btn-primary" @click="createUser">Create user</button>
        </header>

        <main class="page__content">
            <table class="table table-dark users-table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Login</th>
                    <th scope="col">Password</th>
                    <th scope="col">Token</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users">
                    <td>{{user.id}}</td>
                    <td>{{user.login}}</td>
                    <td>{{user.password}}</td>
                    <td>{{user.token}}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm" @click="editUser(user)">Edit</button>
                        <button type="button" class="btn btn-danger btn-sm" @click="deleteUser(user)">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </main>

        <transition name="fade">
            <div class="users-form-popup" v-if="selectedUser" @click.self="selectedUser = null">
                <div class="users-form">
                    <h3>{{ selectedUser.id ? 'Update user' : 'Create user' }}</h3>

                    <div class="form-group">
                        <label for="login">Login</label>
                        <input type="text" class="form-control" id="login" v-model="selectedUser.login">
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="text" class="form-control" id="password" v-model="selectedUser.password">
                    </div>

                    <button type="submit" class="btn btn-primary" @click="saveSelectedUser">
                        {{ selectedUser.id ? 'Update' : 'Create' }}
                    </button>

                    <button type="submit" class="btn btn-default" @click="selectedUser = null">Close</button>
                </div>
            </div>
        </transition>

        <transition name="fade">
            <div class="notification-wrapper" v-if="notificationData">
                <div class="notification" :class="[notificationData.status]">
                    {{ notificationData.text }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
	import axios from 'axios';

	const ENDPOINT = '/users';

	export default {
		data() {
			return {
				users: [],
				selectedUser: null,

				notificationData: null,
				notificationTimeout: null,
			}
		},

		async created() {
            this.showNotification('Fetching users...');

			try {
                const response = await axios.get(ENDPOINT);
                this.users = response.data.users;

                this.showNotification('Successfully fetched!');
			} catch (error) {
                this.showNotification(error.response.data.message, 'error');
			}
		},

		methods: {
			createUser() {
				this.selectedUser = {
					login: '',
					password: '',
				};
			},

			editUser(user) {
				this.selectedUser = { ...user };
			},

			async deleteUser(user) {
                const { id, login } = user;

                if (confirm(`Remove user ${login}?`)) {
                    try {
                        const requestData = JSON.stringify({ id });
                        const response = await axios.delete(ENDPOINT, { data: requestData });

                        if (response.data.affectedRows > 0) {
                            this.showNotification('Successfully deleted');
                            this.users = this.users.filter(item => item.id !== id);
                        }
                    } catch (error) {
                        this.showNotification(error.response.data.message, 'error');
                    }
                }
			},

            async saveSelectedUser() {
                const { id } = this.selectedUser;

                try {
                    const response = await axios.post(ENDPOINT, JSON.stringify(this.selectedUser));

                    if (id) {
                        const editedUserIndex = this.users.findIndex(item => item.id === id);

                        this.users.splice(editedUserIndex, 1, { ...response.data });
                        this.showNotification('Successfully updated');
                    } else {
                        this.users.push({ ...response.data });
                        this.showNotification('Successfully created');
                    }

                    this.selectedUser = null;
                } catch (error) {
                    this.showNotification(error.response.data.message, 'error');
                }
            },

			showNotification(text, status = 'success') {
			    clearTimeout(this.notificationTimeout);

				this.notificationData = { text, status };

				this.notificationTimeout = setTimeout(() => {
				    this.notificationData = null;
                }, 5000);
			},
		}
	}
</script>

<style type="text/css">
    @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

    .users-form-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1050;
        background-color: #121212eb;
        cursor: pointer;
    }

    .users-form {
        width: 600px;
        background-color: #fafafa;
        border-radius: 6px;
        padding: 24px;
        cursor: default;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .page__header {
        display: flex;
        justify-content: flex-end;
        padding: 6px;
    }

    .notification-wrapper {
        position: fixed;
        right: 12px;
        bottom: 12px;
        width: 350px;
        z-index: 1100;
    }

    .notification {
        padding: 12px;
        border-radius: 6px;
        border: 1px solid transparent;
    }

    .notification.error {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }

    .notification.success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
    }
</style>
