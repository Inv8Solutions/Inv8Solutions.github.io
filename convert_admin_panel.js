const fs = require('fs');
let content = fs.readFileSync('src/AdminPanel.vue', 'utf8');

// 0. Import
content = content.replace(
  "import { supabase } from '@/supabase'",
  "import { auth, db, storage } from '@/firebase'\nimport { signOut } from 'firebase/auth'\nimport { collection, doc, query, orderBy, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'\nimport { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'"
);

// 1. logout
content = content.replace(
  "async function handleLogout() { await supabase.auth.signOut(); localStorage.removeItem('isAuthenticated'); localStorage.removeItem('adminEmail'); router.push('/admin/login') }",
  "async function handleLogout() { await signOut(auth); localStorage.removeItem('isAuthenticated'); localStorage.removeItem('adminEmail'); router.push('/admin/login') }"
);

// 2. fetchBlogPosts
content = content.replace(
  "const { data } = await supabase.from('blogposts').select('*').order('created_at', { ascending: false })\n    blogPosts.value = (data ?? []).map(d => ({",
  "const snapshot = await getDocs(query(collection(db, 'blogposts'), orderBy('created_at', 'desc')))\n    blogPosts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

// 3. addBlogPost
content = content.replace(
  "const { data, error } = await supabase.from('blogposts').insert({\n      title: blogForm.value.title, slug: blogForm.value.slug, category: blogForm.value.category,\n      category_color: blogForm.value.categoryColor, excerpt: blogForm.value.excerpt,\n      content: blogForm.value.content, cover_image: blogForm.value.coverImage,\n      author: blogForm.value.author, author_role: blogForm.value.authorRole,\n      date: blogForm.value.date, read_time: blogForm.value.readTime,\n    }).select('id').single()\n    if (error) throw error\n    blogPosts.value.unshift({ id: data!.id, ...blogForm.value })",

  "const docRef = await addDoc(collection(db, 'blogposts'), {\n      title: blogForm.value.title, slug: blogForm.value.slug, category: blogForm.value.category,\n      category_color: blogForm.value.categoryColor, excerpt: blogForm.value.excerpt,\n      content: blogForm.value.content, cover_image: blogForm.value.coverImage,\n      author: blogForm.value.author, author_role: blogForm.value.authorRole,\n      date: blogForm.value.date, read_time: blogForm.value.readTime,\n      created_at: new Date().toISOString()\n    })\n    blogPosts.value.unshift({ id: docRef.id, ...blogForm.value })"
);

// 4. updateBlogPost
content = content.replace(
  "const { error } = await supabase.from('blogposts').update({\n      title: blogForm.value.title, slug: blogForm.value.slug, category: blogForm.value.category,\n      category_color: blogForm.value.categoryColor, excerpt: blogForm.value.excerpt,\n      content: blogForm.value.content, cover_image: blogForm.value.coverImage,\n      author: blogForm.value.author, author_role: blogForm.value.authorRole,\n      date: blogForm.value.date, read_time: blogForm.value.readTime,\n      updated_at: new Date().toISOString(),\n    }).eq('id', selectedBlogId.value)\n    if (error) throw error",

  "await updateDoc(doc(db, 'blogposts', selectedBlogId.value), {\n      title: blogForm.value.title, slug: blogForm.value.slug, category: blogForm.value.category,\n      category_color: blogForm.value.categoryColor, excerpt: blogForm.value.excerpt,\n      content: blogForm.value.content, cover_image: blogForm.value.coverImage,\n      author: blogForm.value.author, author_role: blogForm.value.authorRole,\n      date: blogForm.value.date, read_time: blogForm.value.readTime,\n      updated_at: new Date().toISOString(),\n    })"
);

// 5. deleteBlogPost
content = content.replace(
  "await supabase.from('blogposts').delete().eq('id', post.id)",
  "await deleteDoc(doc(db, 'blogposts', post.id))"
);

// 6. loadGalleryPhotos
content = content.replace(
  "const { data } = await supabase.from('community_gallery').select('*').order('order', { ascending: true })\n  galleryPhotos.value = (data ?? []).map(d => ({",
  "const snapshot = await getDocs(query(collection(db, 'community_gallery'), orderBy('order', 'asc')))\n  galleryPhotos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

// 7. handleGalleryUpload
content = content.replace(
  "const { data: uploaded, error: upErr } = await supabase.storage.from('community-gallery').upload(path, file, { contentType: file.type || 'image/jpeg' })\n    if (upErr) { console.error(upErr); done++; continue }\n    const { data: { publicUrl } } = supabase.storage.from('community-gallery').getPublicUrl(uploaded.path)\n    await supabase.from('community_gallery').insert({ url: publicUrl, storage_path: path, caption: '', order: base + done })",

  "const fileRef = storageRef(storage, path)\n    try { await uploadBytes(fileRef, file, { contentType: file.type || 'image/jpeg' }) } catch(upErr) { console.error(upErr); done++; continue }\n    const publicUrl = await getDownloadURL(fileRef)\n    await addDoc(collection(db, 'community_gallery'), { url: publicUrl, storage_path: path, caption: '', order: base + done })"
);

// 8. deleteGalleryPhoto
content = content.replace(
  "try { await supabase.storage.from('community-gallery').remove([photo.storagePath]) } catch {}\n  await supabase.from('community_gallery').delete().eq('id', photo.id)",
  "try { await deleteObject(storageRef(storage, photo.storagePath)) } catch {}\n  await deleteDoc(doc(db, 'community_gallery', photo.id))"
);

// 9. updateGalleryCaption
content = content.replace(
  "await supabase.from('community_gallery').update({ caption: photo.caption || '' }).eq('id', photo.id)",
  "await updateDoc(doc(db, 'community_gallery', photo.id), { caption: photo.caption || '' })"
);

// 10. uploadProjectImages
content = content.replace(
  "const { data: uploaded, error: upErr } = await supabase.storage.from('sampleworks').upload(path, file, { contentType: file.type || 'image/jpeg' })\n    if (upErr) { console.error(upErr); continue }\n    const { data: { publicUrl } } = supabase.storage.from('sampleworks').getPublicUrl(uploaded.path)",
  "const fileRef = storageRef(storage, path)\n    try { await uploadBytes(fileRef, file, { contentType: file.type || 'image/jpeg' }) } catch(upErr) { console.error(upErr); continue }\n    const publicUrl = await getDownloadURL(fileRef)"
);

// 11. fetchProjects
content = content.replace(
  "const { data } = await supabase.from('sampleworks').select('id, title, client_name, status, date, description, image_url, image_path, additional_image_urls, additional_image_paths, service_id').order('title', { ascending: true })\n  projects.value = (data ?? []).map(d => ({",
  "const snapshot = await getDocs(query(collection(db, 'sampleworks'), orderBy('title', 'asc')))\n  projects.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

// 12. fetchInquiries
content = content.replace(
  "const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })\n  inquiries.value = (data ?? []).map(d => ({",
  "const snapshot = await getDocs(query(collection(db, 'inquiries'), orderBy('created_at', 'desc')))\n  inquiries.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

// 13. fetchCalls
content = content.replace(
  "const { data } = await supabase.from('calls').select('*').order('created_at', { ascending: false })\n  calls.value = (data ?? []).map(d => ({",
  "const snapshot = await getDocs(query(collection(db, 'calls'), orderBy('created_at', 'desc')))\n  calls.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

// 14. updateInquiryStatus
content = content.replace(
  "await supabase.from('inquiries').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', selectedInquiry.value.id)",
  "await updateDoc(doc(db, 'inquiries', selectedInquiry.value.id), { status: newStatus, updated_at: new Date().toISOString() })"
);

// 15. updateCallStatus
content = content.replace(
  "await supabase.from('calls').update({ status, updated_at: new Date().toISOString() }).eq('id', selectedCall.value.id)",
  "await updateDoc(doc(db, 'calls', selectedCall.value.id), { status, updated_at: new Date().toISOString() })"
);

// 16. addProject
content = content.replace(
  "const { data: inserted, error: insErr } = await supabase.from('sampleworks').insert({\n      title: newProject.value.title, client_name: newProject.value.clientName,\n      short_desc: newProject.value.shortDescription || '', description: newProject.value.shortDescription || '',\n      platform: newProject.value.platform || '', service_id: newProject.value.service || null,\n      challenge_statement: newProject.value.challengeStatement || '', solution: newProject.value.solution || '',\n      duration_weeks: newProject.value.duration || 0, features: newProject.value.features || [],\n      tech_stack: newProject.value.techStack || [], image_url: imageUrl, image_path: imagePath,\n      additional_image_urls: additionalImageUrls, additional_image_paths: additionalImagePaths,\n      status: 'Planning', date: new Date().toISOString().split('T')[0],\n    }).select('id').single()\n    if (insErr) throw insErr\n    projects.value.unshift({ id: inserted!.id, name: newProject.value.title, clientName: newProject.value.clientName, status: 'Planning', date: new Date().toISOString().split('T')[0], description: newProject.value.shortDescription || '', imageUrl: imageUrl || undefined, imagePath: imagePath || undefined, additionalImageUrls, additionalImagePaths } as Project)",
  "const docRef = await addDoc(collection(db, 'sampleworks'), {\n      title: newProject.value.title, client_name: newProject.value.clientName,\n      short_desc: newProject.value.shortDescription || '', description: newProject.value.shortDescription || '',\n      platform: newProject.value.platform || '', service_id: newProject.value.service || null,\n      challenge_statement: newProject.value.challengeStatement || '', solution: newProject.value.solution || '',\n      duration_weeks: newProject.value.duration || 0, features: newProject.value.features || [],\n      tech_stack: newProject.value.techStack || [], image_url: imageUrl, image_path: imagePath,\n      additional_image_urls: additionalImageUrls, additional_image_paths: additionalImagePaths,\n      status: 'Planning', date: new Date().toISOString().split('T')[0],\n    })\n    projects.value.unshift({ id: docRef.id, name: newProject.value.title, clientName: newProject.value.clientName, status: 'Planning', date: new Date().toISOString().split('T')[0], description: newProject.value.shortDescription || '', imageUrl: imageUrl || undefined, imagePath: imagePath || undefined, additionalImageUrls, additionalImagePaths } as Project)"
);

// 17. deleteProject
content = content.replace(
  "if (toRemove.length) await supabase.storage.from('sampleworks').remove(toRemove)\n    await supabase.from('sampleworks').delete().eq('id', project.id)",
  "if (toRemove.length) await Promise.all(toRemove.map(path => deleteObject(storageRef(storage, path)).catch(() => {})))\n    await deleteDoc(doc(db, 'sampleworks', project.id))"
);

// 18. updateProject fetching Single
content = content.replace(
  "const { data: d } = await supabase.from('sampleworks').select('*').eq('id', project.id).single()",
  "const docSnap = await getDoc(doc(db, 'sampleworks', project.id))\n    const d = docSnap.exists() ? docSnap.data() : null"
);

// 19. updateProject actually updating
content = content.replace(
  "await supabase.from('sampleworks').update(update).eq('id', editingProjectId.value)",
  "await updateDoc(doc(db, 'sampleworks', editingProjectId.value), update)"
);

fs.writeFileSync('src/AdminPanel.vue', content);
console.log('Conversion complete!');
