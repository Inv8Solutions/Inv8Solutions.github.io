const fs = require('fs');
let content = fs.readFileSync('src/AdminPanel.vue', 'utf8');

content = content.replace(
  /import \{ supabase \} from '@\/supabase'/g,
  "import { auth, db, storage } from '@/firebase'\nimport { signOut } from 'firebase/auth'\nimport { collection, doc, query, orderBy, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'\nimport { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'"
);

content = content.replace(/await supabase\.auth\.signOut\(\)/g, "await signOut(auth)");

content = content.replace(
  /const \{ data \} = await supabase\.from\('blogposts'\)\.select\('\*'\)\.order\('created_at', \{ ascending: false \}\)\s*blogPosts\.value = \(data \?\? \[\]\)\.map\(d => \(\{/g,
  "const snapshot = await getDocs(query(collection(db, 'blogposts'), orderBy('created_at', 'desc')))\n    blogPosts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

content = content.replace(
  /const \{ data, error \} = await supabase\.from\('blogposts'\)\.insert\(\{([\s\S]*?)date: blogForm\.value\.date, read_time: blogForm\.value\.readTime,\s*\}\)\.select\('id'\)\.single\(\)\s*if \(error\) throw error\s*blogPosts\.value\.unshift\(\{ id: data\!\.id, \.\.\.blogForm\.value \}\)/g,
  "const docRef = await addDoc(collection(db, 'blogposts'), {$1date: blogForm.value.date, read_time: blogForm.value.readTime,\n      created_at: new Date().toISOString()\n    })\n    blogPosts.value.unshift({ id: docRef.id, ...blogForm.value })"
);

content = content.replace(
  /const \{ error \} = await supabase\.from\('blogposts'\)\.update\(\{([\s\S]*?)updated_at: new Date\(\)\.toISOString\(\),\s*\}\)\.eq\('id', selectedBlogId\.value\)\s*if \(error\) throw error/g,
  "await updateDoc(doc(db, 'blogposts', selectedBlogId.value), {$1updated_at: new Date().toISOString(),\n    })"
);

content = content.replace(/await supabase\.from\('blogposts'\)\.delete\(\)\.eq\('id', post\.id\)/g, "await deleteDoc(doc(db, 'blogposts', post.id))");

content = content.replace(
  /const \{ data \} = await supabase\.from\('community_gallery'\)\.select\('\*'\)\.order\('order', \{ ascending: true \}\)\s*galleryPhotos\.value = \(data \?\? \[\]\)\.map\(d => \(\{/g,
  "const snapshot = await getDocs(query(collection(db, 'community_gallery'), orderBy('order', 'asc')))\n  galleryPhotos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

content = content.replace(
  /const \{ data: uploaded, error: upErr \} = await supabase\.storage\.from\('community-gallery'\)\.upload\(path, file, \{ contentType: file\.type \|\| 'image\/jpeg' \}\)\s*if \(upErr\) \{ console\.error\(upErr\); done\+\+; continue \}\s*const \{ data: \{ publicUrl \} \} = supabase\.storage\.from\('community-gallery'\)\.getPublicUrl\(uploaded\.path\)\s*await supabase\.from\('community_gallery'\)\.insert\(\{ url: publicUrl, storage_path: path, caption: '', order: base \+ done \}\)/g,
  "const fileRef = storageRef(storage, path)\n    try { await uploadBytes(fileRef, file, { contentType: file.type || 'image/jpeg' }) } catch(upErr) { console.error(upErr); done++; continue }\n    const publicUrl = await getDownloadURL(fileRef)\n    await addDoc(collection(db, 'community_gallery'), { url: publicUrl, storage_path: path, caption: '', order: base + done })"
);

content = content.replace(
  /try \{ await supabase\.storage\.from\('community-gallery'\)\.remove\(\[photo\.storagePath\]\) \} catch \{\}\s*await supabase\.from\('community_gallery'\)\.delete\(\)\.eq\('id', photo\.id\)/g,
  "try { await deleteObject(storageRef(storage, photo.storagePath)) } catch {}\n  await deleteDoc(doc(db, 'community_gallery', photo.id))"
);

content = content.replace(/await supabase\.from\('community_gallery'\)\.update\(\{ caption: photo\.caption \|\| '' \}\)\.eq\('id', photo\.id\)/g, "await updateDoc(doc(db, 'community_gallery', photo.id), { caption: photo.caption || '' })");

content = content.replace(
  /const \{ data: uploaded, error: upErr \} = await supabase\.storage\.from\('sampleworks'\)\.upload\(path, file, \{ contentType: file\.type \|\| 'image\/jpeg' \}\)\s*if \(upErr\) \{ console\.error\(upErr\); continue \}\s*const \{ data: \{ publicUrl \} \} = supabase\.storage\.from\('sampleworks'\)\.getPublicUrl\(uploaded\.path\)/g,
  "const fileRef = storageRef(storage, path)\n    try { await uploadBytes(fileRef, file, { contentType: file.type || 'image/jpeg' }) } catch(upErr) { console.error(upErr); continue }\n    const publicUrl = await getDownloadURL(fileRef)"
);

content = content.replace(
  /const \{ data \} = await supabase\.from\('sampleworks'\)\.select\('id, title, client_name, status, date, description, image_url, image_path, additional_image_urls, additional_image_paths, service_id'\)\.order\('title', \{ ascending: true \}\)\s*projects\.value = \(data \?\? \[\]\)\.map\(d => \(\{/g,
  "const snapshot = await getDocs(query(collection(db, 'sampleworks'), orderBy('title', 'asc')))\n  projects.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

content = content.replace(
  /const \{ data \} = await supabase\.from\('inquiries'\)\.select\('\*'\)\.order\('created_at', \{ ascending: false \}\)\s*inquiries\.value = \(data \?\? \[\]\)\.map\(d => \(\{/g,
  "const snapshot = await getDocs(query(collection(db, 'inquiries'), orderBy('created_at', 'desc')))\n  inquiries.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

content = content.replace(
  /const \{ data \} = await supabase\.from\('calls'\)\.select\('\*'\)\.order\('created_at', \{ ascending: false \}\)\s*calls\.value = \(data \?\? \[\]\)\.map\(d => \(\{/g,
  "const snapshot = await getDocs(query(collection(db, 'calls'), orderBy('created_at', 'desc')))\n  calls.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((d: any) => ({"
);

content = content.replace(/await supabase\.from\('inquiries'\)\.update\(\{ status: newStatus, updated_at: new Date\(\)\.toISOString\(\) \}\)\.eq\('id', selectedInquiry\.value\.id\)/g, "await updateDoc(doc(db, 'inquiries', selectedInquiry.value.id), { status: newStatus, updated_at: new Date().toISOString() })");

content = content.replace(/await supabase\.from\('calls'\)\.update\(\{ status, updated_at: new Date\(\)\.toISOString\(\) \}\)\.eq\('id', selectedCall\.value\.id\)/g, "await updateDoc(doc(db, 'calls', selectedCall.value.id), { status, updated_at: new Date().toISOString() })");

content = content.replace(
  /const \{ data: inserted, error: insErr \} = await supabase\.from\('sampleworks'\)\.insert\(\{([\s\S]*?)date: new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\],\s*\}\)\.select\('id'\)\.single\(\)\s*if \(insErr\) throw insErr\s*projects\.value\.unshift\(\{ id: inserted\!\.id,/g,
  "const docRef = await addDoc(collection(db, 'sampleworks'), {$1date: new Date().toISOString().split('T')[0],\n    })\n    projects.value.unshift({ id: docRef.id,"
);

content = content.replace(/if \(toRemove\.length\) await supabase\.storage\.from\('sampleworks'\)\.remove\(toRemove\)/g, "if (toRemove.length) await Promise.all(toRemove.map(path => deleteObject(storageRef(storage, path)).catch(() => {})))");

content = content.replace(/await supabase\.from\('sampleworks'\)\.delete\(\)\.eq\('id', project\.id\)/g, "await deleteDoc(doc(db, 'sampleworks', project.id))");

content = content.replace(/const \{ data: d \} = await supabase\.from\('sampleworks'\)\.select\('\*'\)\.eq\('id', project\.id\)\.single\(\)/g, "const docSnap = await getDoc(doc(db, 'sampleworks', project.id))\n    const d = docSnap.exists() ? docSnap.data() : null");

content = content.replace(/await supabase\.from\('sampleworks'\)\.update\(update\)\.eq\('id', editingProjectId\.value\)/g, "await updateDoc(doc(db, 'sampleworks', editingProjectId.value), update)");

fs.writeFileSync('src/AdminPanel.vue', content);
console.log('Done!');
