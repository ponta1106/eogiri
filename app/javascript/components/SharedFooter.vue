<template>
  <footer>
    <ul class="sm:flex bg-gray-200 py-1">
      <li class="flex-1 text-gray-700 text-center bg-gray-100 px-4 py-2 m-2 rounded-md">
        <router-link :to="{name: 'TermsOfUse'}">
          <small>利用規約</small>
        </router-link>
      </li>
      <li class="flex-1 text-gray-700 text-center bg-gray-100 px-4 py-2 m-2 rounded-md">
        <router-link :to="{name: 'PrivacyPolicy'}">
          <small>プライバシーポリシー</small>
        </router-link>
      </li>
      <li class="flex-1 text-gray-700 text-center bg-gray-100 px-4 py-2 m-2 rounded-md">
        <router-link :to="{name: 'Contact'}">
          <small>お問合せ</small>
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'SharedFooter'
}
</script>
