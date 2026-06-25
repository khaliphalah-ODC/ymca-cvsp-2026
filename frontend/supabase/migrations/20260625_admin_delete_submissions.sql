-- Allow YMCA admins to delete complaint/suggestion submissions from the admin dashboard.

drop policy if exists "Admins can delete submissions" on public.submissions;

create policy "Admins can delete submissions"
on public.submissions for delete
to authenticated
using (public.is_ymca_admin());

select pg_notify('pgrst', 'reload schema');
