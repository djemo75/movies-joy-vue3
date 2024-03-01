<template>
  <v-layout>
    <v-app-bar color="#0d0c0f">
      <AppLogo />

      <AppNavigation />

      <div class="right-actions">
        <v-btn
          icon="fa fa-search"
          size="small"
          :ripple="false"
          @click="handleSearch"
        >
        </v-btn>
        <template v-if="!user">
          <v-btn
            class="login-button"
            rounded="xl"
            :ripple="false"
            :loading="isAuthLoading"
            @click="redirectToGoogleLogin"
            >Login</v-btn
          >
        </template>
        <div v-else>
          <v-menu location="bottom">
            <template v-slot:activator="{ props }">
              <v-avatar color="info">
                <template v-if="user.picture">
                  <v-img
                    :src="user.picture"
                    :alt="user.given_name"
                    v-bind="props"
                  ></v-img>
                </template>
                <span v-else class="text-h6">{{
                  `${user.given_name[0]}${user.family_name[0]}`
                }}</span>
              </v-avatar>
            </template>
            <v-list class="user-dropdown">
              <div class="full-name">
                {{ user.given_name }} {{ user.family_name }}
              </div>
              <v-list-item>
                <v-list-item-title @click="handleLogout"
                  >Logout</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>

    <v-main><slot></slot></v-main>
  </v-layout>

  <AppFooter />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import AppFooter from "./AppFooter.vue";
import AppLogo from "./AppLogo.vue";
import AppNavigation from "./AppNavigation.vue";
import { STATIC_ROUTES } from "@/router";
import { generateOauthConsentPageUrl } from "@/services/authService";
import { computed } from "vue";
import { useAuthStore } from "@/stores";

const router = useRouter();

const authStore = useAuthStore();

const handleSearch = () => {
  router.push(STATIC_ROUTES.search);
};

const redirectToGoogleLogin = () => {
  location.href = generateOauthConsentPageUrl();
};

const handleLogout = () => {
  authStore.logout();
};

const user = computed(() => authStore.user);
const isAuthLoading = computed(() => authStore.isLoading);
</script>

<style lang="less">
.v-toolbar__content {
  padding-left: 16px;
  padding-right: 16px;
  max-width: 1200px;
  margin: 0 auto;

  .right-actions {
    margin-left: auto;
    display: flex;
    align-items: center;

    .login-button {
      margin-left: 16px;
      background: #c333f3;
      text-transform: none;
      font-weight: 600;

      &:hover {
        background: #a228cb;
      }
    }

    .v-avatar {
      margin-left: 16px;
      cursor: pointer;
      background-color: gray !important;
    }
  }
}

.v-main {
  padding-left: 16px !important;
  padding-right: 16px !important;
  max-width: 1200px !important;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 64px - 110px);
}

.v-list-item {
  cursor: pointer;
  transition: 300ms ease-in-out;

  &:hover {
    background: rgb(223, 223, 223);
  }
}
.full-name {
  padding: 4px 16px 0px 16px;
  font-weight: 500;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
