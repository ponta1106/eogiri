<template>
  <footer>
    <ul class="sm:flex p-3">
      <li class="flex-1 text-orange hover:text-dark hover:bg-orange self-center text-center p-2">
        <router-link :to="{name: 'TermsOfUse'}">
          <small>利用規約</small>
        </router-link>
      </li>
      <li class="flex-1 text-orange hover:text-dark hover:bg-orange self-center text-center p-2">
        <router-link :to="{name: 'PrivacyPolicy'}">
          <small>プライバシーポリシー</small>
        </router-link>
      </li>
      <li class="flex-1 text-orange hover:text-dark hover:bg-orange self-center text-center p-2">
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
