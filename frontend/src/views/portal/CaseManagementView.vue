<script setup>
import AdminMobileNav from '../../components/stitch/AdminMobileNav.vue'
</script>

<template>
  <div class="text-on-background bg-background min-h-screen">
    <AdminMobileNav />
    <main class="p-xl lg:p-2xl">
      <section class="max-w-5xl mx-auto bg-surface card-shadow rounded-xl border border-outline-variant p-xl">
        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-sm">Case Management</h1>
        <p class="font-body-md text-body-md text-on-surface-variant mb-lg">Track assignments, follow-up actions, and safeguarding escalation workflows.</p>
        <RouterLink class="inline-flex items-center gap-xs px-lg py-sm bg-primary text-on-primary rounded-xl font-bold" to="/admin/submissions">
          <span class="material-symbols-outlined text-[20px]">folder_shared</span>
          View Submissions
        </RouterLink>
      </section>
    </main>
  </div>
</template>
